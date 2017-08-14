<?php
    require("01_init.php");
    $did=$_REQUEST['did'];
    if(empty($did)){
        echo json_encode('{"msg":"信息不全"}');
        return;
    }
    $sql="SELECT * FROM kf_dish WHERE did=$did";
    $result=mysqli_query($conn,$sql);
    $row = mysqli_fetch_assoc($result);
    $output[] = $row;
    echo json_encode($output);
?>