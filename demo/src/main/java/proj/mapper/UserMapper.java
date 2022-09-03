package proj.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

//这个注解表示了这市一个mybatis的mapper类
@Mapper
@Repository
public interface UserMapper<Db> {
    List<Db> queryUserList();

    Db queryUserById(int id);

    int addUser(Db db);

    int updateUser(Db db);

    int deleteUser(int id);
}
