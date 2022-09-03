package proj.service;


public class GetJointMessage {
    /*public void jointMessage(){
        String host = "116.57.83.79";
        int port = 50051;
        GrpcClient client = new GrpcClient(host, port);
        Pt_DataVoid request = Pt_DataVoid.newBuilder().setNull(0).build();
        Pt_AXISPOS_SCARA response = client.blockingStub.getAXISPOSSCARA(request);
        double[] jointMessage = new double[4];
        jointMessage[0]=response.getA1();
        jointMessage[1]=response.getA2();
        jointMessage[2]=response.getD();
        jointMessage[3]=response.getA4();
        System.out.println("pt");
        System.out.println(Arrays.toString(jointMessage));

    }*/

    //设置关节角度信息返回给控制器
    /*public void setJointMessage(double[] message){
        return ;
    }*/
}
