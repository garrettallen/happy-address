(function() {
  $('#submit-buttons').on('click', (el) => {
    const target = el.target;
    const street = $('#street').val();
    const loc = $('#location').val();
    const address_type = target.value;
    const address = [street, loc].join(', ');
    console.log({ address_type, address });
    $.ajax({
      "contentType": "application/json",
      "dataType": "json",
      "url": "/address",
      "data": JSON.stringify({ address_type, address }),
      "method" : "POST"
    }).done(function() {
      $('form').html("Address Saved!");
    });
  });

  const setLoading = (html) => {
    $('#loading').html(html);
  };

  const getGeo = (callback) => {
    const geo_error = () => {
      console.log("no position available");
      setLoading('');
    }

    const geo_success = (position) => {
      const geo = {
        "lat": position.coords.latitude,
        "lon": position.coords.longitude
      };
      console.log('obtained navigator geolocation');
      setLoading('');
      callback(geo);
    }

    const geo_options = {
      "enableHighAccuracy": false, 
      "maximumAge": 300000,
      "timeout": 5000
    };

    navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);
  };

  const callback = (geo) => {
    console.log('navigator geo callback');
    $.ajax({
      'url': '/geo/reverse',
      'data': geo
    })
    .done((d) => {
      console.log("pre filling address")
      const addr = d.results[0].formatted_address.split(',');
      $('#street').val(addr[0]);
      $('#location').val(addr.slice(1).join().trim());
    });
  };

  if ("geolocation" in navigator) {
    console.log("geolocation api available")
    getGeo(callback);
  } else {
    setLoading('');
  }
})();