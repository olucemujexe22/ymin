import requests
import base64
import os
import sys

token = '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'
owner, repo = 'olucemujexe22', 'ymin'
headers = {'Authorization': f'token {token}', 'Content-Type': 'application/json'}
path = r'c:\Users\Administrator\Desktop\ymin-website'

files = [
    '.gitignore', 'index.html', 'product-center.html', 'product-detail.html',
    'application-center.html', 'application-automotive.html',
    'application-ai-server.html', 'application-airbag.html',
    'chemicon-airbag.html', 'chemicon-airbag2.html', 'chemicon-recommend.html',
    'anquanqinang.png', 'logo.png',
    'data/automotive-apps.js', 'data/products.js'
]

print("=" * 50)
print("Uploading to GitHub: olucemujexe22/ymin")
print("=" * 50)

# Step 1: Create blobs
tree = []
for f in files:
    fp = os.path.join(path, f)
    if not os.path.exists(fp):
        print(f"SKIP {f} - not found")
        continue
    is_binary = f.endswith('.png') or f.endswith('.jpg') or f.endswith('.ico')
    with open(fp, 'rb') as fh:
        data = fh.read()
    if is_binary:
        content = base64.b64encode(data).decode()
        enc = 'base64'
    else:
        content = data.decode('utf-8')
        enc = 'utf-8'
    
    r = requests.post(f'https://api.github.com/repos/{owner}/{repo}/git/blobs',
                      headers=headers, json={'content': content, 'encoding': enc})
    print(f"{f}: {r.status_code}", end='')
    if r.status_code == 201:
        sha = r.json().get('sha', '')
        tree.append({'path': f, 'mode': '100644', 'type': 'blob', 'sha': sha})
        print(f" -> sha={sha[:8]}")
    else:
        print(f" ERROR: {r.text[:100]}")

print(f"\nTotal blobs: {len(tree)}")
sys.stdout.flush()

# Step 2: Create tree
print("Creating tree...")
r = requests.post(f'https://api.github.com/repos/{owner}/{repo}/git/trees',
                  headers=headers, json={'tree': tree})
if r.status_code == 201:
    tree_sha = r.json()['sha']
    print(f"Tree SHA: {tree_sha[:10]}")
else:
    print(f"Tree FAILED: {r.status_code} {r.text[:200]}")
    sys.exit(1)

# Step 3: Create commit
print("Creating commit...")
r = requests.post(f'https://api.github.com/repos/{owner}/{repo}/git/commits',
                  headers=headers, json={
                      'message': '✨ 永铭电子官网 - 产品中心与应用中心 (2025-05-12)',
                      'tree': tree_sha
                  })
if r.status_code == 201:
    commit_sha = r.json()['sha']
    print(f"Commit SHA: {commit_sha[:10]}")
else:
    print(f"Commit FAILED: {r.status_code} {r.text[:200]}")
    sys.exit(1)

# Step 4: Create/update branch
print("Creating main branch...")
r = requests.post(f'https://api.github.com/repos/{owner}/{repo}/git/refs',
                  headers=headers, json={'ref': 'refs/heads/main', 'sha': commit_sha})
if r.status_code == 201:
    print(f"\n!!! SUCCESS !!!")
    print(f"Repository: https://github.com/{owner}/{repo}")
else:
    print(f"Branch FAILED: {r.status_code} {r.text[:200]}")
