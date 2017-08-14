<?php
    require("01_init.php");
    $userName=$_REQUEST['userName'];
    $userSex=$_REQUEST['userSex'];
    $userAddr=$_REQUEST['userAddr'];
    $userPhone=$_REQUEST['userPhone'];
    $userDid=$_REQUEST['userDid'];
    if(empty($userName)||empty($userSex)||empty($userAddr)||empty($userPhone)||empty($userDid)){
        echo json_encode('{"msg":"您的信息不全"}');
        return;
    }
    $userTime=time()*1000;
    $sql="INSERT INTO kf_order VALUES(NULL,'$userPhone','$userName',$userSex,$userTime,'$userAddr',$userDid)";
    $result=mysqli_query($conn,$sql);
    $myResult=[];
    if($result){
        $myResult["msg"]="success";
        $myResult["oid"]=mysqli_insert_id($conn);
    }else{
        $myResult["msg"]="error";
    }
    echo json_encode($myResult);
?>