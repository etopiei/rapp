outStr = "module.exports = {\n"
arr = '[\n'
for line in open('lang.txt'):
    line = line.strip('\n')
    arr += '\t\t' + line + ',\n'
arr += '\t],\n'
outStr += '\tlanguages: ' + arr
outStr += '\tcmModes: ' + arr
outStr += '}'
print(outStr)
