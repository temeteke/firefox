DIR := /dev/null
ifeq ($(shell uname), Darwin)
	PROFILE := $(wildcard ~/Library/Application_Support/Firefox/Profiles/*.default)
	DIR := $(PROFILE)/chrome
else ifeq ($(shell uname), Linux)
	PROFILE := $(wildcard ~/.mozilla/firefox/*.default)
	DIR := $(PROFILE)/chrome
else ifeq ($(shell uname -o), Cygwin)
	APPDATA := $(shell cygpath "$(APPDATA)")
	PROFILE := $(firstword \
		$(wildcard $(APPDATA)/Mozilla/Firefox/Profiles/*.default) \
		$(shell cygpath "\\app\\FirefoxPortable\\Data\\profile") \
	)
	DIR := $(PROFILE)/chrome
endif

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
	patch -u < addMenu.uc.js.patch

WordHighlightToolbar.uc.js: Griever/WordHighlightToolbar/WordHighlightToolbar.uc.js
	cp $^ $@

alice0775/userChrome.js: alice0775
Griever/addMenu/addMenu.uc.js: Griever
Griever/WordHighlightToolbar/WordHighlightToolbar.uc.js: Griever

alice0775: FORCE
	[ -d $@ ] \
		&& (cd $@ && git pull) \
		|| git clone --depth 1 https://github.com/alice0775/userChrome.js.git $@

Griever: FORCE
	[ -d $@ ] \
		&& (cd $@ && git pull) \
		|| git clone --depth 1 https://github.com/Griever/userChromeJS.git $@

clean:
	rm -rf $(TARGETS) $(TEMPS)

$(DIR):
	mkdir $@

install: $(TARGETS) $(DIR)
	cp $(FILES) $(TARGETS) $(DIR)/
		
uninstall:
	rm -rf $(addprefix $(DIR)/, $(FILES) $(TARGETS))

FORCE:
