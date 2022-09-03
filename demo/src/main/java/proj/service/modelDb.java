package proj.service;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class modelDb {
    private int id;
    private String Joint_name;
    private String Joint_type;
    private int now_db;
    private int last_db;
}
