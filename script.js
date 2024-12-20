<script>
  var audio = document.querySelector('audio');
  var isPlaying = false;

  audio.addEventListener('play', function() {
    if (!isPlaying) {
      isPlaying = true;
      // Ovozning harakati yoki boshqa 8D effekti qo'shish uchun JavaScript kodi
      // Masalan, audio balansini o'zgartirish
      setInterval(function() {
        var pan = Math.sin(Date.now() / 1000) * 0.5;  // Ovozning o'ng va chap tomonlarga harakati
        audio.pan = pan;
      }, 100);
    }
  });
</script>
