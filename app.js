console.log(navigator.serviceWorker)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js', {
    scope: '/'
  })
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function(error) {
      console.log('Service worker registration failed, error:', error);
    });

    var button = document.getElementById("notifications");
    button.addEventListener('click', function(e) {
      Notification.requestPermission().then(function(result) {
        if(result === 'granted') {
            randomNotification();
        }
      });
    });

    function randomNotification() {
      var randomItem = { name: 'bb', author: 'bb', slug: 'bg' };
      var notifTitle = randomItem.name;
      var notifBody = 'Created by '+randomItem.author+'.';
      var notifImg = '/'+randomItem.slug+'.jpg';
      var options = {
          body: notifBody,
          icon: notifImg
      }
      var notif = new Notification(notifTitle, options);
      setTimeout(randomNotification, 30000);
    }

    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker.getRegistration().then((registration) => {
    //     registration && registration.unregister().then((boolean) => {
    //       boolean ? alert('注销成功') : alert('注销失败')
    //     });
    //   })
    // }
  }