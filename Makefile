.PHONY: clean
clean:
	find . -name 'node_modules' -type d -prune -print -exec rm -rf '{}' \;
	find . -name 'build' -type d -prune -print -exec rm -rf '{}' \;
	find . -name 'android' -type d -prune -print -exec rm -rf '{}' \;

.PHONY: move
move:
	mv $(FOLDER_NAME) /mnt/d