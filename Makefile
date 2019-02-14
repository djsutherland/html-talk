USE_LIVERELOAD ?= false
USE_SYNC ?= false
FOR_WEB ?= false

BIN := ${CURDIR}/node_modules/.bin

.PHONY: all clean clean-config

all: index.html js/config.js css/djs.css

clean-config:
	rm -f js/config.js

clean: clean-config
	rm -f index.html css/*.css js/mj-plugin/*.js

index.html: slides.pug layout.pug js/mj-plugin/fragments.js
	${CURDIR}/bin/compile

js/config.js:
	${CURDIR}/bin/make-config --livereload=${USE_LIVERELOAD} --sync=${USE_SYNC} --for_web=${FOR_WEB}

css/%.css: scss/%.scss
	${BIN}/node-sass $< > $@

js/mj-plugin/%.js: js/mj-plugin-src/%.js
	@# the tpl script kind of sucks
	cd $(dir $<) && ${BIN}/tpl $*.js ../mj-plugin -- --dirname=${CURDIR}/$(dir $@)
