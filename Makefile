BIN := ${CURDIR}/node_modules/.bin
.PHONY: all clean distribute

all: index.html css/djs.css

clean:
	rm -f index.html slides.html css/*.css js/mj-plugin/*.js

css/%.css: scss/%.scss
	${BIN}/node-sass $< > $@

js/mj-plugin/%.js: js/mj-plugin-src/%.js
	@# the tpl script kind of sucks
	cd $(dir $<) && ${BIN}/tpl $*.js ../mj-plugin -- --dirname=${CURDIR}/$(dir $@)

slides.html: slides.pug
	${BIN}/pug $<

index.html: slides.html
	${BIN}/mjpage --dollars --extensions "file://${CURDIR}/js/mj-plugin/fragments.js" < $< > $@
