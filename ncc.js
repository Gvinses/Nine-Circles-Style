let fs = require('fs')
const {spilter, setVariables, set_strings_with_vars} = require("./compiler");
const {exec} = require('child_process');

let file1 = process.argv[2]
let file2 = file1.split('.')[1].split('\\')[1]

if (process.argv[3] !== undefined) {
    file2 = process.argv[3]
}

function installer() {
    exec('npm install -g sass', (error, stdout, stderr) => {
        if (error) {
            return console.log(error)
        }
        if (stderr) {
            return console.log(stderr)
        }
    })
}

exec('sass --version', (error, stdout, stderr) => {
    if (error) {
        return installer()
    }
    if (stderr) {
        return installer()
    }
})


fs.readFile(file1, function (error, data) {
    if (error) {
        return console.error(error)
    }

    if (data.includes(' ')) {
        let length = 9 + file1.length
        throw new Error('\n' + '-'.repeat(length) + '\nspace in ' + file1 + '\n' + '-'.repeat(length))
    }

    let splited_data = spilter(data.toString())
    let vars = setVariables(splited_data[0])
    let compied_strings = set_strings_with_vars(splited_data[1], vars)

    fs.writeFile(`${file1}.scss`, compied_strings, function (error) {
        if (error) {
            return console.log(error)
        }
        console.log("Nine Circles Compiled!")
    });
    exec(`sass ${file1}.scss ${file2}.css`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`)
            return
        }
        if (stderr) {
            console.error(`Error: ${stderr}`)
            return
        }
        fs.unlink(`${file1}.scss`, function (error) {
            if (error) {
                return console.log(error)
            }
        })
    })
})