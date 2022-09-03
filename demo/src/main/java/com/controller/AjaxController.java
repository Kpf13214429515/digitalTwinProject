package com.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
public class AjaxController {
/*    @Autowired
    EquipmentService equipmentService;

    @RequestMapping(value = "/a1",method = RequestMethod.POST)
    @ResponseBody
    public String ajax(Integer jointId, HttpServletResponse response){
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
    }*/
}
