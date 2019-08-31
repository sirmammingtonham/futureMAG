import gpt_2_simple as gpt2

model_name = "345M"
# gpt2.download_gpt2(model_name=model_name)

sess = gpt2.start_tf_sess()
gpt2.finetune(sess,
              'ooonezero.txt',
              steps=20000,
              sample_every=500,
              save_every=1000,
              model_name=model_name,
              max_checkpoints=10,
              run_name='onezero_m')   # steps is max number of training steps

# gpt2.generate(sess, run_name='onezero')
