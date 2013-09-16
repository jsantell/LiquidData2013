BROWSERIFY=./node_modules/browserify/bin/cmd.js

all: install browserify

browserify:
	mkdir -p ./build
	node $(BROWSERIFY) -r ./src/index.js > ./build/build.js

install: 
	@npm install

.PHONY: browserify
