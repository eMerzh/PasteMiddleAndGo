
var pasteMiddleAndGo = {
  isUrl: function(e)
  {
    var v = new RegExp();
    v.compile('^ *(([a-zA-Z-]{2,6}):\\/\\/)?(www\\.)?([a-zA-Z1-90-]{2,}\\.)+?([a-zA-Z-]{2,6})(:\\d{2,})?(\\/\\S+)* *$');
    if (!v.test(e))
    {
      return false;
    }
    return true;
  },
  
  onPastAction: function()
  {
    var prefs = Components.classes["@mozilla.org/preferences-service;1"].
      getService(Components.interfaces.nsIPrefBranch);
    var u=readFromClipboard();
    
    var ss = Components.classes["@mozilla.org/browser/search-service;1"]. 
      getService(Ci.nsIBrowserSearchService);
      
    var engine = ss.currentEngine;
    var search = engine.getSubmission(u,null);
    var browser = getBrowser();
    
      
    var browser = getBrowser();
    if(pasteMiddleAndGo.isUrl(u))
    {
      var tab = browser.loadOneTab(u,null,null,null,false,false);
    }
    else
    {
      var tab = browser.loadOneTab(search.uri.spec,null,null,search.postData,true,false);
    }
    browser.selectedTab = tab;
  },
  
  newcheckForMiddleClick: function(node, event) {
    // We should be using the disabled property here instead of the attribute,
    // but some elements that this function is used with don't support it (e.g.
    // menuitem).
    if (node.getAttribute("disabled") == "true")
      return; // Do nothing

    if (event.button == 1) {
        /*ChangeTabButton overlay*/
      if( node.getAttribute("class") == "tabs-newtab-button")
      {
        pasteMiddleAndGo.onPastAction();
        return;
      }
      //if we are not satisfied let's launch the old middle check
      pasteMiddleAndGo.oldcheckMiddleClick(node, event);
    }
  }
}
pasteMiddleAndGo.oldcheckMiddleClick = checkForMiddleClick;
checkForMiddleClick = pasteMiddleAndGo.newcheckForMiddleClick;