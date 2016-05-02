// modules css imports
import 'bootstrap/dist/css/bootstrap.css';

// app css imports
import './style.css';

// modules js imports
import angular from 'angular';
import 'angular-i18n/angular-locale_fr-fr';
import uibootstrap from 'angular-ui-bootstrap';

// app js imports


// run app
(function() {

  function hideURLbar(){
    window.scrollTo(0,1);
  }


  function bootstrapApplication(strictDi) {
    // let appName = 'My Application';
    let modName = 'myApplication';

    const site = angular.module(modName, [uibootstrap]);


    angular.element(document).ready(function() {
      setTimeout(hideURLbar, 0);
      angular.bootstrap(document, [site.name], {strictDi: !!strictDi});
    });
  }

  // var time = document.getElementById('time');

  // var timer = setInterval(updateClock, 1000);

  // function updateClock() {
  //   time.innerHTML = (new Date()).toString();
  // }
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(function() {
      // clearInterval(timer);
      // console.log('module.hot.dispose called : reloading ...');
      document.location.reload();
    });
  }

  bootstrapApplication();

}());
