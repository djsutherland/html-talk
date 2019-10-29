BIN := ${CURDIR}/node_modules/.bin

.PHONY: all clean

all: index.html css/djs.css

clean:
	rm -f index.html css/*.css js/mj-plugin/*.js

index.html: slides.pug layout.pug js/mj-plugin/fragments.js
	${CURDIR}/bin/compile

css/%.css: scss/%.scss
	${BIN}/node-sass -qo css $<

js/mj-plugin/%.js: js/mj-plugin/%.js.tpl
	${CURDIR}/bin/template --dirname=${CURDIR}/$(dir $@) $< $@
