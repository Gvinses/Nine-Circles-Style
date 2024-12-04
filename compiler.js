let variables = []

function spilter(data) {
    let splitedData = data.split('/v/')
    let vars_in_file = splitedData[0]

    let styles = splitedData[1].split('^')
    let splited_vars = vars_in_file.split('^')

    return [splited_vars, styles]
}

function setVariables(vars) {
    variables = vars.map(item => {
        let splited_var = item.split('=')
        let key = splited_var[0].trim()
        let value = splited_var[1].replace(/'/g, '').trim()
        return {[key]: value}
    });
    return variables
}

function set_strings_with_vars(strings, variables) {
    let data = ''
    strings.map(item => {
        let splited_string = item.split('=')
        let styleString = splited_string[1]

        let stylesArray = styleString.split(';').map(style => style.trim())

        for (let variable of variables) {
            let key = Object.keys(variable)[0]
            let value = Object.values(variable)[0]

            stylesArray = stylesArray.map(style => {
                return style.replace(`${key}`, ' ' + String(value))
            });
        }
        splited_string[1] = stylesArray.join(';\n\t')
        data += splited_string[0] + ' {\n\t' + splited_string[1] + '}'
    })

    return data
}

module.exports = {spilter, setVariables, set_strings_with_vars}