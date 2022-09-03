package proj.bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Equipment {
    private Integer jointId;
    private String jName;
    private String jointType;
    private Integer jointDb;

    //设备数据
    private  String guid;
    private  String type;
    private  Integer type_subIndex;
    private  String ip_port;
    private  String actual_name;
    private  String status;



    public Integer getJointId(){
        return jointId;
    }
    public void setJointId(Integer jointId){
        this.jointId = jointId;
    }
    public String getjName(){
        return jName;
    }
    public String getjointType(){
        return jointType;
    }


}
