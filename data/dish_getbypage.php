<?php
    header("Content-Type:application/json;charset=utf-8");
    @$num=$_REQUEST['start'] or die('{"code":-1,"msg":"请输入页码"}');
    $conn=mysqli_connect("127.0.0.1","root","","kaifanla");
    mysqli_query($conn,"SET NAMES UTF8");
    $page=($num-1);
    $sql="SELECT did,name,price,img_sm,material FROM kf_dish LIMIT $page,5";
    $result=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
//    $output[]=$rows;
    echo json_encode($rows);

?>