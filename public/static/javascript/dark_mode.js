window.addEventListener('load', addDarkmodeWidget);


function addDarkmodeWidget() {
    
  
    var options = {
        // bottom: '64px', // default: '32px'
        // right: 'unset', // default: '32px'
        // left: '32px', // default: 'unset'
        time: '0.5s', // default: '0.3s'
        mixColor: '#FEF3C9', // default: '#fff'
        buttonColorDark: '#383c61',  // default: '#100f2c'
        buttonColorLight:  '#FEF3C9', // default: '#fff'
        saveInCookies: false // default: true
      }
       
    new Darkmode(options).showWidget();

    var btn = document.getElementsByClassName('darkmode-toggle')[0];
    var btn_bg = document.getElementsByClassName('darkmode-layer--button')[0];
    var btn_show = document.getElementsByClassName('darkmode-layer--button')[0];
    btn.ariaLabel = "Activeer donkere modus met hoog contrast";
    btn.innerHTML = "donkere modus";
    btn.style.fontSize = "0.65em";
    btn.style.color = "#FEF3C9";
        
    var windowWidth = window.innerWidth;
    if (windowWidth < 500) {
        $(btn_show).hide();
        $(btn).hide();

    }
}
