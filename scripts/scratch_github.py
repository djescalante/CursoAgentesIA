import urllib.request, json, ssl, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
ssl._create_default_https_context = ssl._create_unverified_context
url = 'https://api.github.com/users/Gentleman-Programming/repos?sort=pushed&per_page=15'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
res = urllib.request.urlopen(req)
repos = json.loads(res.read().decode())
for r in repos:
    print(f"- {r['name']} (Stars: {r['stargazers_count']})\n  {r['description']}\n")
