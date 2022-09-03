package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
@CrossOrigin(origins = "*",maxAge = 3600)
@RestController
public class JdbcController {
    @Autowired
    JdbcTemplate jdbcTemplate;

    //查询数据库的所有信息
    @GetMapping("/equipmentList")
    public List<Map<String,Object>> useList(){

        //String sql = "select * from 4robot";
        String sql = "select * from equipments";

        List<Map<String, Object>> List_maps = jdbcTemplate.queryForList(sql);
        return List_maps;
    }
}
