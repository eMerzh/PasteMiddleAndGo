ZIPPROG=/usr/bin/zip
.DELETE_ON_ERROR:

# phony targets (shortcuts)
.PHONY: all clean xpi

xpi: pastemiddleandgo.xpi

pastemiddleandgo.xpi: dist
	cd dist/ && \
	find ./ -name '*~' -exec rm '{}' \; -print -or -name ".*~" -exec rm {} \; -print && \
	cd chrome && \
	$(ZIPPROG) -r -9 PasteMiddleAndGo.jar content skin && \
	rm -r content skin && \
	cd .. && \
	$(ZIPPROG) -r -9 ../pastemiddleandgo.xpi .

dist:
	cp -r src dist

clean:
	-rm -rf dist pastemiddleandgo.xpi
