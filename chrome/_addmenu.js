// Get bookmarks in 'search' folder and add to searchmenu
var search = new PageMenu({
	label:"選択文字列を検索",
	condition: "select"
});
Services.search.getEngines().forEach(function(engine){
	if ( !engine.hidden ) {
		search({
			label: engine.name,
			keyword: engine.alias,
			text: "%s",
			where: "tab",
			src: engine.iconURI? engine.iconURI.spec : ""
		});
	}
});
var historyService = Components.classes["@mozilla.org/browser/nav-history-service;1"].getService(Components.interfaces.nsINavHistoryService);
var options = historyService.getNewQueryOptions();
var query = historyService.getNewQuery();
var bookmarksService = Components.classes["@mozilla.org/browser/nav-bookmarks-service;1"].getService(Components.interfaces.nsINavBookmarksService);

query.setFolders([bookmarksService.unfiledBookmarksFolder], 1);

var result = historyService.executeQuery(query, options);
var rootNode = result.root;
rootNode.containerOpen = true;
for (var i = 0; i < rootNode.childCount; i ++) {
	var node = rootNode.getChild(i);
	if ( node.RESULT_TYPE_FOLDER && node.title == 'search' ) {
		var folderId = node.itemId;
	}
}
rootNode.containerOpen = false;

if (folderId) {
	query.setFolders([folderId], 1);
	
	result = historyService.executeQuery(query, options);
	rootNode = result.root;
	rootNode.containerOpen = true;
	for (var i = 0; i < rootNode.childCount; i ++) {
		var node = rootNode.getChild(i);
		search({
			label: node.title,
			//url: node.uri,
			keyword: bookmarksService.getKeywordForBookmark(node.itemId),
			text: "%s",
			where: "tab",
			src: node.icon
		});
	}
	rootNode.containerOpen = false;
}
