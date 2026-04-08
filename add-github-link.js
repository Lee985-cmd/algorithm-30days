const fs = require('fs');
const path = require('path');

// 获取所有Day文件
const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.startsWith('Day ') && f.endsWith('.md'));

const githubLink = '\n📚 **项目地址：** https://github.com/Lee985-cmd/algorithm-30days  \n⭐ **如果对你有帮助，请给个 Star！**\n';

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 检查是否已经包含GitHub链接
    if (!content.includes('github.com/Lee985-cmd')) {
        // 在第一个 "---" 之前插入链接
        const lines = content.split('\n');
        let insertIndex = -1;
        
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim() === '---') {
                insertIndex = i;
                break;
            }
        }
        
        if (insertIndex > 0) {
            lines.splice(insertIndex, 0, githubLink);
            const newContent = lines.join('\n');
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`✓ Updated: ${file}`);
        } else {
            console.log(`✗ Skipped (no separator): ${file}`);
        }
    } else {
        console.log(`- Already has link: ${file}`);
    }
});

console.log('\nDone!');
