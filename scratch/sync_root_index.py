with open('web/index.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Replace relative paths for root index.html
c = c.replace('href="css/styles.css"', 'href="web/css/styles.css"')
c = c.replace('src="js/embedded_data.js"', 'src="web/js/embedded_data.js"')
c = c.replace('src="js/data_layer.js"', 'src="web/js/data_layer.js"')
c = c.replace('src="js/map.js"', 'src="web/js/map.js"')
c = c.replace('src="js/charts.js"', 'src="web/js/charts.js"')
c = c.replace('src="js/app.js"', 'src="web/js/app.js"')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('Synchronized root index.html successfully')
