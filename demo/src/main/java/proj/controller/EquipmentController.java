package proj.controller;

import com.alibaba.fastjson.JSONObject;
import proj.bean.Equipment;
import proj.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@Controller
public class EquipmentController {
    @Autowired
    EquipmentService equipmentService;
    @Autowired
    JdbcTemplate jdbcTemplate;

    //页面跳转
    @RequestMapping("/equipment")
    public String goJointSearch(){
        return "jointSearch";
    }

    //返回json数据给ajax

    @RequestMapping(value = "/searchById")
    @ResponseBody

    public String getJointId(@RequestParam("jointId") Integer jointId, HttpServletResponse response){
        System.out.println(jointId);
        Equipment joint = equipmentService.getJointById(jointId);
        JSONObject result = new JSONObject();
        response.setHeader("Access-Control-Allow-Origin","*");
        if(joint!=null){
            System.out.println(joint.getjName());
            result.put("status", "success");
            result.put("joint", joint);
        }
        else {
            result.put("status", "fail");
        }
        return result.toJSONString();
    }
    //测试打印数据库表，成功
/*    public List<Map<String,Object>> useList(){
        String sql = "select * from 4robot";
        List<Map<String, Object>> List_maps = jdbcTemplate.queryForList(sql);
        return List_maps;
    }*/
}
