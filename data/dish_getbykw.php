<?php
    require("01_init.php");
    @$kw=$_REQUEST['kw'];
    if(empty($kw)){
        return;
    }
    $sql="SELECT * FROM kf_dish WHERE name LIKE '%$kw%' OR material LIKE '%$kw%'";
    $result=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
//    $output[]=$rows;
    echo json_encode($rows);
?>