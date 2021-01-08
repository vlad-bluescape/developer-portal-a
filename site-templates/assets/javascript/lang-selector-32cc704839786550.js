function selectLanguage(lang,url) {
    const selector = `lang-${lang}`;
    $('pre.lang').hide();
    $(`pre.${selector}`).show();
  
  
    $('.lang-selector button').removeClass('btn-primary');
    $(`.lang-selector button[data-lang=${lang}]`).addClass('btn-primary');
  
    if (lang === "curl" && (url === "/guides/listeners-api" || url === "/guides/attachments-api")) {
      $('pre.lang-node-primary').show();
      $('button.btn-node-primary').addClass('btn-primary');
    }
  }
  
  function setupDisplay(url) {
    jQuery.fn.exists = function () { return this.length > 0; }
    if (url === "/guides/listeners-api" || url === "/guides/attachments-api") {
      var allLangDivs = document.getElementsByClassName("lang-selector");
      //var allCurlPres = document.getElementsByClassName("lang-curl");
      var allCurlPres = $('pre.lang-curl');
      var count = 0;
  
      for (var i = 0; i < allLangDivs.length; i++) {    //loop through all instances of lang-selector and determine which sections are populated and which should be removed
        var curlPre = allCurlPres[i];
  
        if ($(curlPre).text() === "hidden")
        {
          var curlPreList = $('pre.lang-curl')[i-count];
          $(curlPreList).remove();
          count += 1;
  
          var nodePreList = $('pre.lang-node')[i]; 
          $(nodePreList).show();
          $(nodePreList).addClass('lang-node-primary');
  
          var curlButtonList = $('button.curlButton')[i];
          $(curlButtonList).removeClass('btn-primary');
          $(curlButtonList).hide();
  
          var nodeButtonList = $('button.nodeButton')[i];
          $(nodeButtonList).addClass('btn-primary');
          $(nodeButtonList).addClass('btn-node-primary');
        }
      }
    }
    else {
      var curlPre = $('pre.lang-curl');
      var curlButton = $('button.curlButton');
      var nodePre = $('pre.lang-node');
      var nodeButton = $('button.nodeButton');
      var pythonPre = $('pre.lang-python');
      var pythonButton = $('button.pythonButton');
  
      //if curl section does not exist, hide the button and remove primary class so it is not default selected
      if (!(curlPre.exists())) {
        $(curlButton).hide();
        $(curlButton).removeClass('btn-primary');
      }
  
      if (!(nodePre.exists())) {
        $(nodeButton).hide();
      }
      else if (!(curlPre.exists())) {  
        $(nodePre).show();
        $(nodeButton).addClass('btn-primary');
      }
  
      
      if (!(pythonPre.exists())) {
        $(pythonButton).hide();
      }
      else if (!(curlPre.exists()) && !(nodePre.exists())) {
        $(pythonPre).show();
        $(pythonButton).addClass('btn-primary');
      }
  
    }
  }
  
  $(document).ready(() => {
    var url = window.location.pathname;
  
    $('.lang-selector').on('click', 'button', (e) => {
      selectLanguage($(e.target).attr('data-lang'),url);
    });
    selectLanguage($('.lang-selector:first button:first').attr('data-lang'),url);
    setupDisplay(url);
  });
  