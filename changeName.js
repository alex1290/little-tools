const fs = require('fs');
//write folder directory
const directory = "./src/components";
//ignore files (including type)
const ignore = [
    'HOC','routes'
]

const targetTypes = ['js']

const changeType = 'jsx'

const findData = fileDirectory => {
    if (fs.existsSync(fileDirectory)) {
        let files = fs.readdirSync(fileDirectory);
        files.forEach((file, index) => {
            let name = file.split('.')[0]
            let type = file.split('.')[1]
            let path = fileDirectory + `/${file}`;
            if (ignore.some(i => i === file)) {
                return
            } else if (targetTypes.some(i => i === type)) {
                console.log(index);
                let newPath = path.replace(type, changeType)
                fs.rename(path, newPath, function (err) {
                    if (err) throw err;
                    console.log(path + ' change success!');
                });
            } else if (!type) {
                findData(fileDirectory + "/" + name)
            } else {
                console.log(path);
                return
            }
        })
    } else {
        console.log(fileDirectory + "  Not Found!");
    }
}
findData(directory);