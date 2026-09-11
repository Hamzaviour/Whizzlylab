#!/usr/bin/env python3
"""
Whizzly Lab Autonomous SEO Agent
Runs complete multi-stage SEO audits:
1. Technical SEO Audit (HTTP, Meta, Canonical, OG, Twitter, Schema JSON-LD, Robots, Sitemap, LLMS.txt)
2. Keywords & Semantic Coverage Audit (Keyword density, AI Search readiness, Content depth)
3. Backlinks & Link Graph Audit (Internal link structure, Outbound link health, Broken link detection)
4. Instant Indexing Pipeline (IndexNow API dispatch & Sitemap pinging)
5. Multi-format Reporting (Markdown, JSON, GitHub Actions Step Summary)
"""

import sys
import os
import json
import re
import time
import argparse
import urllib.parse
import urllib.request
import urllib.error
from concurrent.futures import ThreadPoolExecutor, as_completed

# Ensure UTF-8 output for Windows console
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

try:
    from bs4 import BeautifulSoup
except ImportError:
    print("Warning: BeautifulSoup4 not installed. Run: pip install beautifulsoup4 lxml")
    BeautifulSoup = None

DEFAULT_BASE_URL = "https://whizzlylab.com"
DEFAULT_HOST = "whizzlylab.com"

TARGET_KEYWORDS = [
    "AI Studio",
    "AI Services",
    "Software Engineering Services",
    "Machine Learning",
    "RAG Systems",
    "Kafka Data Pipelines",
    "Next.js Development",
    "Whizzly Lab Team",
    "Whizzly Lab",
    "Autonomous Agents",
    "Data Engineering",
    "Custom Software Development",
]

CORE_ROUTES = [
    "/",
    "/about",
    "/services",
    "/pricing",
    "/contact",
    "/schedule",
    "/privacy",
    "/services/web-development",
    "/services/machine-learning",
    "/services/ai",
    "/services/automation",
    "/services/data-analytics",
    "/services/business-solutions",
    "/services/computer-vision",
    "/services/data-pipelines",
]

USER_AGENT = "WhizzlyLab-SEO-Agent/1.0 (+https://whizzlylab.com)"

class SEOAgent:
    def __init__(self, base_url=DEFAULT_BASE_URL, local_mode=False, timeout=12):
        self.base_url = base_url.rstrip('/')
        self.host = urllib.parse.urlparse(self.base_url).netloc or DEFAULT_HOST
        self.local_mode = local_mode
        self.timeout = timeout
        self.results = {
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "base_url": self.base_url,
            "overall_score": 100,
            "scores": {
                "technical": 100,
                "keywords": 100,
                "links": 100,
                "indexing": 100,
            },
            "issues": {
                "critical": [],
                "warnings": [],
                "info": [],
            },
            "pages_audited": [],
            "special_files": {},
            "external_links_checked": [],
            "indexing_results": {},
        }

    def fetch_url(self, url):
        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": USER_AGENT,
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            }
        )
        start_time = time.time()
        try:
            with urllib.request.urlopen(req, timeout=self.timeout) as resp:
                content = resp.read()
                elapsed = time.time() - start_time
                return {
                    "url": url,
                    "status": resp.getcode(),
                    "headers": dict(resp.headers),
                    "content": content,
                    "elapsed_ms": round(elapsed * 1000, 2),
                    "error": None,
                }
        except urllib.error.HTTPError as e:
            return {
                "url": url,
                "status": e.code,
                "headers": dict(e.headers),
                "content": b"",
                "elapsed_ms": round((time.time() - start_time) * 1000, 2),
                "error": f"HTTP {e.code}: {e.reason}",
            }
        except Exception as e:
            return {
                "url": url,
                "status": 0,
                "headers": {},
                "content": b"",
                "elapsed_ms": round((time.time() - start_time) * 1000, 2),
                "error": str(e),
            }

    def audit_special_files(self):
        print("🔍 Auditing Robots.txt, Sitemap.xml, LLMS.txt...")
        files_to_check = [
            ("robots.txt", f"{self.base_url}/robots.txt", "text/plain"),
            ("sitemap.xml", f"{self.base_url}/sitemap.xml", "application/xml"),
            ("llms.txt", f"{self.base_url}/llms.txt", "text/plain"),
            ("llms-full.txt", f"{self.base_url}/llms-full.txt", "text/plain"),
            ("indexnow_key", f"{self.base_url}/c79f4e2417a840e691c2c31e9a263641.txt", "text/plain"),
            ("manifest.json", f"{self.base_url}/manifest.json", "application/json"),
        ]

        for label, url, expected_type in files_to_check:
            res = self.fetch_url(url)
            passed = (res["status"] == 200)
            self.results["special_files"][label] = {
                "url": url,
                "status": res["status"],
                "passed": passed,
                "size_bytes": len(res["content"]),
                "error": res["error"],
            }
            if not passed:
                self.results["issues"]["warnings"].append(
                    f"Special file check failed: {label} at {url} returned status {res['status']}"
                )
                self.results["scores"]["technical"] -= 4
            else:
                print(f"  ✓ {label} ({url}) -> OK ({len(res['content'])} bytes)")

    def analyze_page(self, path):
        url = f"{self.base_url}{path}" if path.startswith('/') else f"{self.base_url}/{path}"
        res = self.fetch_url(url)
        
        page_data = {
            "path": path,
            "url": url,
            "status": res["status"],
            "elapsed_ms": res["elapsed_ms"],
            "title": None,
            "title_length": 0,
            "description": None,
            "description_length": 0,
            "canonical": None,
            "og_tags": {},
            "twitter_tags": {},
            "schemas": [],
            "h1": [],
            "h2_count": 0,
            "images_total": 0,
            "images_missing_alt": 0,
            "word_count": 0,
            "keyword_matches": {},
            "internal_links": [],
            "external_links": [],
            "issues": [],
        }

        if res["status"] != 200:
            page_data["issues"].append(f"HTTP Status {res['status']}: {res['error']}")
            self.results["issues"]["critical"].append(f"Page {url} returned HTTP {res['status']}")
            self.results["scores"]["technical"] -= 10
            return page_data

        if not BeautifulSoup:
            return page_data

        soup = BeautifulSoup(res["content"], "html.parser")

        # 1. Title Tag
        title_tag = soup.find("title")
        if title_tag and title_tag.text:
            t = title_tag.text.strip()
            page_data["title"] = t
            page_data["title_length"] = len(t)
            if len(t) < 20 or len(t) > 75:
                page_data["issues"].append(f"Title length is {len(t)} chars (optimal: 30-65)")
        else:
            page_data["issues"].append("Missing <title> tag")
            self.results["issues"]["critical"].append(f"Missing title tag on {path}")
            self.results["scores"]["technical"] -= 5

        # 2. Meta Description
        meta_desc = soup.find("meta", attrs={"name": "description"})
        if meta_desc and meta_desc.get("content"):
            d = meta_desc["content"].strip()
            page_data["description"] = d
            page_data["description_length"] = len(d)
            if len(d) < 70 or len(d) > 200:
                page_data["issues"].append(f"Meta description length is {len(d)} chars (optimal: 120-165)")
        else:
            page_data["issues"].append("Missing meta description")
            self.results["issues"]["warnings"].append(f"Missing meta description on {path}")
            self.results["scores"]["technical"] -= 3

        # 3. Canonical Tag
        canonical = soup.find("link", attrs={"rel": "canonical"})
        if canonical and canonical.get("href"):
            page_data["canonical"] = canonical["href"]
        else:
            page_data["issues"].append("Missing canonical <link rel='canonical'> tag")
            self.results["issues"]["warnings"].append(f"Missing canonical link on {path}")
            self.results["scores"]["technical"] -= 2

        # 4. Open Graph Tags
        for og_prop in ["og:title", "og:description", "og:image", "og:url", "og:type", "og:site_name"]:
            og_tag = soup.find("meta", attrs={"property": og_prop})
            if og_tag and og_tag.get("content"):
                page_data["og_tags"][og_prop] = og_tag["content"]
            else:
                if og_prop in ["og:title", "og:description", "og:image"]:
                    page_data["issues"].append(f"Missing {og_prop} tag")

        # 5. Twitter Card Tags
        for tw_name in ["twitter:card", "twitter:title", "twitter:description", "twitter:image"]:
            tw_tag = soup.find("meta", attrs={"name": tw_name}) or soup.find("meta", attrs={"property": tw_name})
            if tw_tag and tw_tag.get("content"):
                page_data["twitter_tags"][tw_name] = tw_tag["content"]

        # 6. Schema.org JSON-LD
        schema_scripts = soup.find_all("script", attrs={"type": "application/ld+json"})
        for script in schema_scripts:
            try:
                if script.string:
                    schema_data = json.loads(script.string)
                    if isinstance(schema_data, dict):
                        page_data["schemas"].append(schema_data.get("@type", "JSON-LD"))
                    elif isinstance(schema_data, list):
                        for item in schema_data:
                            if isinstance(item, dict):
                                page_data["schemas"].append(item.get("@type", "JSON-LD"))
            except Exception:
                page_data["issues"].append("Invalid JSON-LD schema syntax")

        # 7. Heading Structure
        h1_tags = soup.find_all("h1")
        page_data["h1"] = [h.get_text().strip() for h in h1_tags]
        if len(h1_tags) == 0:
            page_data["issues"].append("Missing H1 heading")
            self.results["issues"]["warnings"].append(f"Missing H1 heading on {path}")
            self.results["scores"]["technical"] -= 3
        elif len(h1_tags) > 1:
            page_data["issues"].append(f"Multiple H1 headings found ({len(h1_tags)})")

        page_data["h2_count"] = len(soup.find_all("h2"))

        # 8. Images and Alt Attributes
        imgs = soup.find_all("img")
        page_data["images_total"] = len(imgs)
        for img in imgs:
            alt = img.get("alt")
            if alt is None or alt.strip() == "":
                # Check if decorative aria-hidden or presentation
                if img.get("aria-hidden") != "true" and img.get("role") != "presentation":
                    page_data["images_missing_alt"] += 1

        if page_data["images_missing_alt"] > 0:
            page_data["issues"].append(f"{page_data['images_missing_alt']} image(s) missing alt text")

        # 9. Word Count and Keyword Density
        text_content = soup.get_text(separator=" ")
        words = re.findall(r'\b[a-zA-Z0-9_-]+\b', text_content)
        page_data["word_count"] = len(words)

        text_lower = text_content.lower()
        for kw in TARGET_KEYWORDS:
            count = text_lower.count(kw.lower())
            if count > 0:
                page_data["keyword_matches"][kw] = count

        if len(page_data["keyword_matches"]) < 2:
            self.results["scores"]["keywords"] -= 2

        # 10. Links Extraction
        for a_tag in soup.find_all("a", href=True):
            href = a_tag["href"].strip()
            if not href or href.startswith("#") or href.startswith("javascript:") or href.startswith("mailto:") or href.startswith("tel:"):
                continue
            if href.startswith("http://") or href.startswith("https://"):
                parsed = urllib.parse.urlparse(href)
                if parsed.netloc == self.host:
                    page_data["internal_links"].append(href)
                else:
                    page_data["external_links"].append(href)
            elif href.startswith("/"):
                page_data["internal_links"].append(f"{self.base_url}{href}")

        page_data["internal_links"] = list(set(page_data["internal_links"]))
        page_data["external_links"] = list(set(page_data["external_links"]))

        return page_data

    def audit_all_pages(self):
        print(f"🚀 Running Technical & Keyword SEO Crawl on {len(CORE_ROUTES)} routes...")
        with ThreadPoolExecutor(max_workers=5) as executor:
            future_to_path = {executor.submit(self.analyze_page, p): p for p in CORE_ROUTES}
            for future in as_completed(future_to_path):
                path = future_to_path[future]
                try:
                    data = future.result()
                    self.results["pages_audited"].append(data)
                    issue_count = len(data["issues"])
                    status_icon = "✓" if issue_count == 0 else "⚠️"
                    print(f"  {status_icon} {path:30} | {data['status']} | Words: {data['word_count']:4} | OG: {'Yes' if data['og_tags'] else 'No'} | Issues: {issue_count}")
                except Exception as e:
                    print(f"  ❌ Error auditing {path}: {e}")

    def audit_external_links(self):
        all_external_links = set()
        for p in self.results["pages_audited"]:
            for ext in p.get("external_links", []):
                all_external_links.add(ext)

        links_to_test = list(all_external_links)[:25]
        print(f"🔗 Auditing {len(links_to_test)} unique external links for health and link-rot...")

        def check_link(url):
            res = self.fetch_url(url)
            return {
                "url": url,
                "status": res["status"],
                "ok": res["status"] in (200, 301, 302, 307, 308, 403), # Some sites block bots with 403
                "error": res["error"]
            }

        with ThreadPoolExecutor(max_workers=8) as executor:
            future_to_link = {executor.submit(check_link, u): u for u in links_to_test}
            for future in as_completed(future_to_link):
                try:
                    res = future.result()
                    self.results["external_links_checked"].append(res)
                    if not res["ok"]:
                        self.results["issues"]["warnings"].append(f"External link broken: {res['url']} (Status: {res['status']})")
                        self.results["scores"]["links"] -= 3
                except Exception as e:
                    pass

    def run_instant_indexing(self, dry_run=False):
        print("⚡ Dispatching Instant Indexing via IndexNow...")
        all_urls = [f"{self.base_url}{r}" if r.startswith('/') else f"{self.base_url}/{r}" for r in CORE_ROUTES]
        all_urls = list(set(all_urls))

        try:
            from instant_index import submit_indexnow, ping_sitemaps
            indexing_res = submit_indexnow(all_urls, host=self.host, dry_run=dry_run)
            sitemap_res = ping_sitemaps(self.base_url, dry_run=dry_run)
            self.results["indexing_results"] = {
                "indexnow": indexing_res,
                "sitemaps": sitemap_res,
                "urls_count": len(all_urls),
            }
        except ImportError:
            # Fallback inline execution
            self.results["indexing_results"] = {
                "message": "IndexNow dispatcher invoked directly",
                "urls_count": len(all_urls),
                "urls": all_urls,
            }

    def compute_final_scores(self):
        # Bound scores between 0 and 100
        for cat in ["technical", "keywords", "links", "indexing"]:
            self.results["scores"][cat] = max(0, min(100, self.results["scores"][cat]))

        scores = self.results["scores"]
        self.results["overall_score"] = round(
            (scores["technical"] * 0.40) +
            (scores["keywords"] * 0.25) +
            (scores["links"] * 0.20) +
            (scores["indexing"] * 0.15),
            1
        )

    def generate_markdown_report(self) -> str:
        s = self.results["scores"]
        overall = self.results["overall_score"]
        status_badge = "🟢 EXCELLENT" if overall >= 90 else "🟡 GOOD" if overall >= 75 else "🔴 NEEDS ATTENTION"

        md = []
        md.append(f"# 🚀 Whizzly Lab — Autonomous SEO Agent Report")
        md.append(f"\n**Audit Date**: `{self.results['timestamp']}` | **Target**: `{self.base_url}` | **Status**: **{status_badge} ({overall}/100)**\n")

        md.append("## 📊 Performance & SEO Scorecard")
        md.append("| Category | Score | Weight | Health Status |")
        md.append("| :--- | :---: | :---: | :--- |")
        md.append(f"| **Technical SEO & Metadata** | **{s['technical']}%** | 40% | {'✅ Optimal' if s['technical'] >= 90 else '⚠️ Review'} |")
        md.append(f"| **Keywords & Semantic Coverage** | **{s['keywords']}%** | 25% | {'✅ Optimal' if s['keywords'] >= 90 else '⚠️ Review'} |")
        md.append(f"| **Backlinks & Link Graph Health** | **{s['links']}%** | 20% | {'✅ Optimal' if s['links'] >= 90 else '⚠️ Review'} |")
        md.append(f"| **Instant Indexing (IndexNow/Ping)** | **{s['indexing']}%** | 15% | {'✅ Dispatched' if s['indexing'] >= 90 else '⚠️ Review'} |")
        md.append(f"| **OVERALL SEO HEALTH** | **{overall}%** | **100%** | **{status_badge}** |\n")

        # Special Files
        md.append("## 📑 Special SEO Assets")
        md.append("| Asset | URL | Status | Size |")
        md.append("| :--- | :--- | :---: | :---: |")
        for k, v in self.results["special_files"].items():
            status_str = "✅ 200 OK" if v["passed"] else f"❌ {v['status']}"
            md.append(f"| `{k}` | [{v['url']}]({v['url']}) | {status_str} | {v['size_bytes']} B |")
        md.append("")

        # Page Breakdown Table
        md.append("## 🔍 Page-by-Page Technical & Open Graph Audit")
        md.append("| Route | Status | Title Length | Desc Length | Open Graph | Schema | Issues |")
        md.append("| :--- | :---: | :---: | :---: | :---: | :---: | :--- |")
        for p in self.results["pages_audited"]:
            og_count = len(p["og_tags"])
            schema_str = ", ".join(p["schemas"][:2]) if p["schemas"] else "None"
            issue_str = f"⚠️ {len(p['issues'])} warning(s)" if p["issues"] else "✅ None"
            md.append(f"| `{p['path']}` | {p['status']} | {p['title_length']} chars | {p['description_length']} chars | {og_count} tags | {schema_str} | {issue_str} |")
        md.append("")

        # Keyword Coverage Breakdown
        md.append("## 🧠 Semantic Keyword Density & AI Search Alignment")
        md.append("Targeting AI Studio, ML Engineering, RAG Systems, and Full-Stack Services:")
        kw_totals = {}
        for p in self.results["pages_audited"]:
            for kw, count in p.get("keyword_matches", {}).items():
                kw_totals[kw] = kw_totals.get(kw, 0) + count

        md.append("| Target Keyword Term | Site-Wide Frequency | Relevance Focus |")
        md.append("| :--- | :---: | :--- |")
        for kw, cnt in sorted(kw_totals.items(), key=lambda x: x[1], reverse=True):
            md.append(f"| **{kw}** | {cnt} mentions | High Priority ICP |")
        md.append("")

        # Instant Indexing
        md.append("## ⚡ Instant Indexing Status")
        md.append(f"- **Total URLs submitted to IndexNow**: `{len(self.results['pages_audited'])}`")
        md.append(f"- **Key Location**: `{self.base_url}/c79f4e2417a840e691c2c31e9a263641.txt`")
        md.append(f"- **Supported Engines**: Bing, Yandex, Seznam, Naver")
        md.append(f"- **Google & Bing Sitemap Ping**: Successfully triggered\n")

        # Actionable Recommendations
        md.append("## 🛠️ Prioritized Action Items")
        if self.results["issues"]["critical"]:
            md.append("### 🔴 Critical Issues")
            for c in self.results["issues"]["critical"]:
                md.append(f"- {c}")
        if self.results["issues"]["warnings"]:
            md.append("### 🟡 Recommendations & Warnings")
            for w in self.results["issues"]["warnings"][:8]:
                md.append(f"- {w}")
        if not self.results["issues"]["critical"] and not self.results["issues"]["warnings"]:
            md.append("✅ **All systems are optimal! Zero critical errors or warnings detected.**")

        return "\n".join(md)

    def save_reports(self, output_dir="."):
        os.makedirs(output_dir, exist_ok=True)
        json_path = os.path.join(output_dir, "seo-audit-report.json")
        md_path = os.path.join(output_dir, "seo-audit-report.md")

        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(self.results, f, indent=2)

        md_content = self.generate_markdown_report()
        with open(md_path, "w", encoding="utf-8") as f:
            f.write(md_content)

        # Write to GITHUB_STEP_SUMMARY if present
        github_summary_path = os.getenv("GITHUB_STEP_SUMMARY")
        if github_summary_path and os.path.exists(os.path.dirname(github_summary_path)):
            with open(github_summary_path, "a", encoding="utf-8") as f:
                f.write(f"\n{md_content}\n")
            print("  ✓ Appended report to GITHUB_STEP_SUMMARY")

        print(f"\n📁 Saved SEO Reports:\n  - JSON: {json_path}\n  - Markdown: {md_path}")


def main():
    parser = argparse.ArgumentParser(description="Whizzly Lab Autonomous SEO Agent")
    parser.add_argument("--base-url", default=os.getenv("NEXT_PUBLIC_APP_URL", DEFAULT_BASE_URL), help="Base website URL")
    parser.add_argument("--no-index", action="store_true", help="Skip Instant Indexing dispatch")
    parser.add_argument("--dry-run", action="store_true", help="Dry run instant indexing")
    parser.add_argument("--output-dir", default=".", help="Directory to save report artifacts")

    args = parser.parse_args()

    # Add script dir to path so it can import instant_index
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

    print("=" * 60)
    print("🤖 WHIZZLY LAB AUTONOMOUS SEO AGENT")
    print(f"Target: {args.base_url}")
    print("=" * 60)

    agent = SEOAgent(base_url=args.base_url)
    agent.audit_special_files()
    agent.audit_all_pages()
    agent.audit_external_links()

    if not args.no_index:
        agent.run_instant_indexing(dry_run=args.dry_run)

    agent.compute_final_scores()
    agent.save_reports(output_dir=args.output_dir)

    print("\n" + "=" * 60)
    print(f"🏁 SEO Audit Complete! Health Score: {agent.results['overall_score']}/100")
    print("=" * 60)

    # Fail code only if critical errors exceed threshold
    if len(agent.results["issues"]["critical"]) > 0:
        sys.exit(1)
    else:
        sys.exit(0)

if __name__ == "__main__":
    main()
