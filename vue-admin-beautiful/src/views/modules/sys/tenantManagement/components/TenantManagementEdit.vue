<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="800px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="105px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="租户名称" prop="tenantName">
            <el-input v-model="form.tenantName" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否启用" prop="izUsable">
            <el-select v-model="form.izUsable" placeholder="请选择" style="width: 100%">
              <el-option
                v-for="item in dict.no_yes"
                :key="item.dictValue"
                :label="item.dictName"
                :value="item.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="form.remark" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doInsert, doUpdate } from "@/api/tenantManagement";
  import { isName, isNull} from "@/utils/validate";

  export default {
    name: "TenantManagementEdit",
    data() {

      const validateName = (rule, value, callback) => {
        if (isNull(value)) {
          callback(new Error("请输入名称"));
        } if (!isName(value)) {
          callback(new Error("名称格式不正确"));
        } else {
          callback();
        }
      };

      return {
        form: {
          izUsable: '0',
          // 设置默认值
          version: 0
        },
        dict: {},
        rules: {
          tenantName: [
            { required: true, trigger: "blur", validator: validateName },
          ],
        },
        title: "",
        dialogFormVisible: false,
      };
    },
    created() {

    },
    methods: {
      showEdit(row) {
        // 建议每次开启时 都重新获取 在本地缓存性能损耗不是很大
        // 如果不是每次开启时查询 在created中 有可能会短暂查不到
        this.dict = {
          no_yes: this.$getDictList("no_yes"),
        };

        if (!row) {
          this.title = "添加";
        } else {
          this.title = "编辑";
          this.form = Object.assign({}, row);
        }
        this.dialogFormVisible = true;
      },
      close() {
        this.$refs["form"].resetFields();
        this.form = this.$options.data().form;
        this.dialogFormVisible = false;
        this.$emit("fetchData");
      },
      save() {
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            // 修改
            if (!isNull(this.form.id)) {
              const { success, msg } = await doUpdate(this.form);
              if(success){
                this.$baseMessage(msg, "success");
              }
            } else {
              const { success, msg } = await doInsert(this.form);
              if(success){
                this.$baseMessage(msg, "success");
              }
            }

            await this.$emit("fetchData");
            this.close();
          } else {
            return false;
          }
        });
      },
    },
  };
</script>
