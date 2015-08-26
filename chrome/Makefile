DIR := $(shell which cygpath > /dev/null 2>&1 && cygpath "${APPDATA}\\Mozilla\\Firefox\\profiles\\*.default\\chrome")
DIR := $(shell echo $(DIR))
FILES := _addmenu.js
TARGETS := userChrome.js addMenu.uc.js WordHighlightToolbar.uc.js
TEMPS := alice0775 Griever

.PHONY: all clean install uninstall FORCE
.PRECIOUS: $(TEMPS)

all: $(TARGETS)

userChrome.js: alice0775/userChrome.js
	cp $^ $@

addMenu.uc.js: Griever/addMenu/addMenu.uc.js
	cp $^ $@

WordHighlightToolbar.uc.js: Griever/WordHighlightToolbar/WordHighlightToolbar.uc.js
	cp $^ $@

alice0775/userChrome.js: alice0775
Griever/addMenu/addMenu.uc.js: Griever
Griever/WordHighlightToolbar/WordHighlightToolbar.uc.js: Griever

alice0775: FORCE
	[ -d $@ ] \
		&& (cd $@ && git pull) \
		|| git clone https://github.com/alice0775/userChrome.js.git $@

Griever: FORCE
	[ -d $@ ] \
		&& (cd $@ && git pull) \
		|| git clone https://github.com/Griever/userChromeJS.git $@

clean:
	rm -rf $(TARGETS) $(TEMPS)

install: $(FILES) $(TARGETS)
	cp $^ $(DIR)/
		
uninstall:
	rm -rf $(addprefix $(DIR)/, $(FILES) $(TARGETS))

FORCE:
