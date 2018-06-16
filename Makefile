USE_LIVERELOAD ?= false
USE_SYNC ?= false
FOR_WEB ?= false

BIN := ${CURDIR}/node_modules/.bin

.PHONY: all clean clean-html

all: index.html css/djs.css

clean-html:
	rm -f index.html

clean: clean-html
	rm -f css/*.css js/mj-plugin/*.js

css/%.css: scss/%.scss
	${BIN}/node-sass $< > $@

js/mj-plugin/%.js: js/mj-plugin-src/%.js
	@# the tpl script kind of sucks
	cd $(dir $<) && ${BIN}/tpl $*.js ../mj-plugin -- --dirname=${CURDIR}/$(dir $@)

index.html: slides.pug layout.pug js/mj-plugin/fragments.js
	${CURDIR}/bin/compile --livereload=${USE_LIVERELOAD} --sync=${USE_SYNC} --for_web=${FOR_WEB}
