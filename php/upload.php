<?php
if (isset($_FILES['images'])) {
  $total = count($_FILES['images']['name']);

  for ($i = 0; $i < $total; $i++) {
    $targetPath = "img/" . basename($_FILES['images']['name'][$i]);
    if (move_uploaded_file($_FILES['images']['tmp_name'][$i], $targetPath)) {
      echo "Plik ". basename($_FILES['images']['name'][$i]). " został przesłany.";
    } else {
      echo "Wystąpił błąd podczas przesyłania pliku.";
    }
  }
}
?>
