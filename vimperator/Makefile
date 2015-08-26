DIRS := \
	$(shell which cygpath > /dev/null 2>&1 && cygpath "${USERPROFILE}") \
	$(HOME)
DIRS := $(foreach dir,$(DIRS),$(shell [ -d $(dir) ] && echo $(dir)))
DIR := $(word 1, $(DIRS))
$(if $(DIR), ,$(error The installation directory is not found))

PLUGINS := _libly.js account_switcher.js caret-hint.js copy.js direct_bookmark.js feedSomeKeys_3.js forcefocuscontent.js multi_requester.js walk-input.js
COLORS := solarized_light.vimp

TEMP := vimperator-plugins $(addprefix .vimperator/plugin/, $(PLUGINS)) $(addprefix .vimperator/colors/, $(COLORS))
TARGETS := .vimperatorrc .vimperator

.PHONY: all clean install uninstall FORCE
.PRECIOUS: vimperator-plugins/% vimperator-colors/%

all: $(TARGETS)

.vimperator: $(addprefix .vimperator/plugin/, $(PLUGINS)) $(addprefix .vimperator/colors/, $(COLORS))

.vimperator/plugin/%: vimperator-plugins/%
	cp $< $(@D)/

vimperator-plugins/%: vimperator-plugins
	
vimperator-plugins: FORCE
	[ -d $@ ] \
		&& (cd $@ && git pull) \
		|| git clone https://github.com/vimpr/vimperator-plugins.git $@

.vimperator/colors/solarized_light.vimp:
	curl https://raw.githubusercontent.com/yasumemo/dotfiles/master/vimperator/colors/solarized_light.vimp > $@

.vimperator/colors/%: vimperator-colors/%
	cp $< $(@D)/

vimperator-colors/%: vimperator-colors
	
vimperator-colors: FORCE
	[ -d $@ ] \
		&& (cd $@ && git pull) \
		|| git clone https://github.com/vimpr/vimperator-colors.git $@

clean:
	rm -rf $(TEMP)

install: $(TARGETS)
	cp -r $(TARGETS) $(DIR)/

uninstall:
	rm -rf $(addprefix $(DIR)/, $(TARGETS))

FORCE:
