USE_LIVERELOAD ?= false
USE_SYNC ?= false

BIN := ${CURDIR}/node_modules/.bin

.PHONY: all clean clean-html clean-lr-sync

all: index.html css/djs.css

clean-html:
	rm -f index.html

clean-lr-sync: clean-html
	rm -f js/mj-plugin/*.js

clean: clean-lr-sync
	rm -f css/*.css

css/%.css: scss/%.scss
	${BIN}/node-sass $< > $@

js/mj-plugin/%.js: js/mj-plugin-src/%.js
	@# the tpl script kind of sucks
	cd $(dir $<) && ${BIN}/tpl $*.js ../mj-plugin -- --dirname=${CURDIR}/$(dir $@) --sync=${USE_SYNC}

index.html: slides.pug layout.pug js/mj-plugin/fragments.js
	${CURDIR}/bin/compile --livereload=${USE_LIVERELOAD} --sync=${USE_SYNC}
