// Copyright (c) 2011.  CA Technologies, Inc.  All rights reserved

/**
 * A gantt module
 */
define( [ "jquery", "uif/js/clarity" ], function( $, $c ) {
  $c.gantt = $c.gantt || {};
  //To make sure the left margin of workspace is 0px.
  window.createCSSForPrintableViewWorkSpace = function() {
  	var css = '#ppm_workspace {margin-left:0px;} .ppm_tabs {margin-left:0px;} @media print {.ppm_button_bar {display:none;} }',
    head = document.getElementsByTagName('head')[0],
    style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
      head.appendChild(style);
  }

  
  window.initGanttPrintableViewBackgroundSize = function() {
    $( "#ppm_workspace" ).css( "width", $( ".ppm_portlets" ).css( "width" ) );
    $( "#ppm_workspace" ).css( "height", parseInt( $( ".ppm_page_content" ).css( "height" ) ) + 30 + "px" );
  }
  
  window.adjustGanttPrintableViewBackgroundSize = function() {
    $( "#ppm_workspace" ).css( "width", $( ".ppm_portlets" ).css( "width" ) );
    $( "#ppm_workspace" ).css( "height", parseInt( $( ".ppm_portlets" ).css( "height" ) ) + 30 + "px" );
  }
  /**
   * A function that renders the header of the Gantt page
   * @param {Object} con the jQuery container of the header
   * @param {Object} labels the i18n labels
   * @param {Object} page the page JSO from the server response
   */
  $c.gantt.header = function( con, labels, page ) {
	if ( window.location.href.indexOf('print=true') > 0 ) {
	  window.createCSSForPrintableViewWorkSpace();
      con.append( '<div class="ppm_button_bar" style = "margin-left: 15px;margin-bottom: 1px;padding-bottom: 1px">' + 
          '<input id="next_task_blocks_button" class="ppm_button" type="button" value="' + labels.next + '"/>' +
          '<span id="next_task_blocks_message" style = "margin-left: 5px;"></span>' +
          '</div>' );
      
      $( "#ppm_app" ).removeClass( "ppm_page_bg" );

	} else {
      con.append( '<div class="ppm_header_small"><table role="presentation"><tr><td><img id="ppm_header_logo_small" src="' + $c.uitk.SPACER_SRC + '" alt="logo"/></td><td id="ppm_header_product_small"><span/></td></tr></table>' +
          '<div class="ppm_header_links">' +
          '<img src="ui/uitk/images/wait_header.gif" id="ppm_header_wait" style="display: none; margin-right: 6px;" alt=""/>' +
          '<button id="ppm_refresh" class="ppm_refresh_small" title="' + labels.refresh + '"><img src="' + $c.uitk.SPACER_SRC + '" alt="' + labels.refresh + '"/></button>' +
          '<a id="ppm_header_links_div" href="#" class="ppm_header_links_div">' + '</a>' +
          '<button id="ppm_add_fav" class="ppm_dialog_favs" title="' + labels.addToFav + '"><img src="' + $c.uitk.SPACER_SRC + '" alt="' + labels.addToFav + '"/></button>' +
          '<a id="ppm_header_links_div" href="#" class="ppm_header_links_div">' + '</a>' +
          '<img src="' + $c.uitk.SPACER_SRC + '" id="ppm_header_user_img" alt=""/>' +
          '<span id="ppm_header_user">' + $c.session.fullname + '</span>' +
          (!$c.app.hasCapa ? '' : '<a id="ppm_header_learn" href="#" class="ppm_header_links_div">' + labels.learn + '</a>' ) +
          '<a id="ppm_header_help" href="#" class="ppm_header_links_div">' + labels.help + '</a>' +
          '</div>' +
          '</div>' );
    
      // favorites link handler
      $( "#ppm_add_fav" ).click( function(e) {
        var name = encodeURIComponent( document.title );
        $c.uitk.xhr(
        {	
          data: '{Url: "' + $c.uitk.shell.getFavoritesLink() + '", LinkName: "' + name + '"}',
          url: $c.uitk.ODATA_REL_PATH + "/AddFavorites"
        }, true );
      });

      //learn link
      if( $c.app.hasCapa ) {
        $( "#ppm_header_learn" ).click( function(e) {
          e.preventDefault();
          require( ["uitk/js/help"], function() {
            $c.uitk.help.showCapa();
          });
        });
      }

      //help link
      $( "#ppm_header_help" ).click( function(e) {
        e.preventDefault();
        require( ["uitk/js/help"], function() {
          $c.uitk.help.showHelp();
        });
      });
      
    }
  };
} );
