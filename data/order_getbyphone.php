<?php
    require("01_init.php");
    $phone=$_REQUEST['phone'];
    if(empty($phone)){
        echo '[]';
        return;
    }
    $sql="SELECT o.oid,d.img_sm,o.order_time,o.user_name,d.did FROM kf_dish d,kf_order o WHERE o.phone=$phone AND o.did=d.did";
    $result=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($rows);
?>