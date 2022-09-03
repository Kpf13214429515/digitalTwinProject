package proj.mapper;

import proj.bean.Equipment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface EquipmentMapper {
    //通过设备接口，根据ID来查询设备信息
    @Select("select * from 4robot where jointId=#{id}")
    public Equipment getJointById(Integer id);
}
