.PHONY: all clean install uninstall FORCE

DIRS := vimperator

all: $(DIRS)

$(DIRS): FORCE
	@cd $@ && $(MAKE)

clean:
	@for dir in $(DIRS); do \
		cd $$dir && $(MAKE) clean; \
	done

install:
	@for dir in $(DIRS); do \
		cd $$dir && $(MAKE) install; \
	done

uninstall:
	@for dir in $(DIRS); do \
		cd $$dir && $(MAKE) uninstall; \
	done

FORCE:
