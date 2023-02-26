<?php

    session_start();

    if (!isset($_SESSION['client-id'])) {
        $_SESSION['client-id'] = uniqid('bs-wj-', true);
    }

    require_once('./app.phtml');
?>