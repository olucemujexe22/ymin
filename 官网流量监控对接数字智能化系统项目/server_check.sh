#!/bin/bash
echo "=========================================="
echo "  服务器环境诊断报告"
echo "  用于：官网流量分析智能体部署评估"
echo "  时间：$(date '+%Y-%m-%d %H:%M:%S')"
echo "=========================================="

echo ""
echo "===== 1. 操作系统 ====="
cat /etc/os-release 2>/dev/null | head -5
uname -a

echo ""
echo "===== 2. CPU & 内存 ====="
echo "CPU: $(nproc) 核"
free -h | grep Mem
df -h / | tail -1

echo ""
echo "===== 3. 外网连通性 ====="
curl -s --connect-timeout 5 https://www.baidu.com > /dev/null && echo "外网: ✅ 正常" || echo "外网: ❌ 不通"
curl -s --connect-timeout 5 https://api.baidu.com > /dev/null && echo "百度API: ✅ 可达" || echo "百度API: ❌ 不可达"

echo ""
echo "===== 4. Python ====="
python3 --version 2>/dev/null || python --version 2>/dev/null || echo "Python: ❌ 未安装"

echo ""
echo "===== 5. Node.js ====="
node --version 2>/dev/null || echo "Node.js: ❌ 未安装"
npm --version 2>/dev/null

echo ""
echo "===== 6. Nginx / Apache ====="
nginx -v 2>/dev/null || echo "Nginx: ❌ 未找到"
httpd -v 2>/dev/null || apache2 -v 2>/dev/null || echo "Apache: ❌ 未找到"

echo ""
echo "===== 7. MySQL / MariaDB ====="
mysql --version 2>/dev/null || echo "MySQL客户端: ❌ 未找到"
mysqladmin --version 2>/dev/null

echo ""
echo "===== 8. PHP ====="
php --version 2>/dev/null | head -1 || echo "PHP: ❌ 未找到"

echo ""
echo "===== 9. 网站目录结构 ====="
if [ -d "/www/wwwroot" ]; then
    ls -la /www/wwwroot/ 2>/dev/null | head -20
    echo ""
    echo "--- 网站目录大小 ---"
    du -sh /www/wwwroot/*/ 2>/dev/null | head -20
elif [ -d "/www/server" ]; then
    echo "宝塔面板路径: /www/server"
    ls /www/server/panel/vhost/nginx/ 2>/dev/null | head -20
    echo ""
    echo "--- 尝试查找网站根目录 ---"
    grep -r "root" /www/server/panel/vhost/nginx/*.conf 2>/dev/null | grep -v "^#" | head -10
fi

echo ""
echo "===== 10. 端口占用 ====="
netstat -tlnp 2>/dev/null | grep -E ":(80|443|3000|5000|8080|8888|9000)" || ss -tlnp | grep -E ":(80|443|3000|5000|8080|8888|9000)"

echo ""
echo "===== 11. 磁盘剩余空间 ====="
df -h

echo ""
echo "===== 12. Git ====="
git --version 2>/dev/null || echo "Git: ❌ 未安装"

echo ""
echo "=========================================="
echo "  诊断完成，请将以上全部内容复制给我"
echo "=========================================="
