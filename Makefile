USE_LIVERELOAD ?= false
USE_SYNC ?= false
FOR_WEB ?= false
FOR_PDF ?= false

BIN := ${CURDIR}/node_modules/.bin

.PHONY: all clean clean-config

all: index.html js/config.js css/djs.css

clean-config:
	rm -f js/config.js

clean: clean-config
	rm -f index.html css/*.css js/mj-plugin/*.js

index.html: slides.pug layout.pug js/mj-plugin/fragments.js
	${CURDIR}/bin/compile

js/config.js: js/config.js.tpl
	${CURDIR}/bin/template --use_livereload=${USE_LIVERELOAD} --use_sync=${USE_SYNC} --for_web=${FOR_WEB} --for_pdf=${FOR_PDF} $< $@

css/%.css: scss/%.scss
	${BIN}/node-sass -qo css $<

js/mj-plugin/%.js: js/mj-plugin/%.js.tpl
	${CURDIR}/bin/template --dirname=${CURDIR}/$(dir $@) $< $@
