package com.service;


import com.bean.Equipment;
import com.mapper.EquipmentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EquipmentService {
    @Autowired
    EquipmentMapper equipmentMapper;

    public Equipment getJointById(Integer id){

        return equipmentMapper.getJointById(id);
    }
}
