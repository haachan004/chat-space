$(function(){

  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="mainchat__chatScreen__Box" data-message-id=${message.id}>
          <div class="mainchat__chatScreen__Box__infoBox">
            <div class="mainchat__chatScreen__Box__infoBox__name">
              ${message.user_name}
            </div>
            <div class="mainchat__chatScreen__Box__infoBox__timestamp">
              ${message.created_at}
            </div>
          </div>
          <div class="mainchat__chatScreen__Box__infoBox__subTitle">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="mainchat__chatScreen__Box" data-message-id=${message.id}>
        <div class="mainchat__chatScreen__Box__infoBox">
          <div class="mainchat__chatScreen__Box__infoBox__name">
            ${message.user_name}
          </div>
          <div class="mainchat__chatScreen__Box__infoBox__timestamp">
            ${message.created_at}
          </div>
        </div>
        <div class="mainchat__chatScreen__Box__infoBox__subTitle">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }


  $('.chatText__form').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url, 
      type: 'POST', 
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.mainchat__chatScreen').append(html); 
      $('.mainchat__chatScreen').animate({ scrollTop: $('.mainchat__chatScreen')[0].scrollHeight});     
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })

    .always(function(){
      $('.__sendbtn').prop("disabled", false);
      $('form')[0].reset();

    })

  });
});