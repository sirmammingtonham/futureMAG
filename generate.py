import gpt_2_simple as gpt2

run_name = 'onezero_m'
sess = gpt2.start_tf_sess()
gpt2.load_gpt2(sess, run_name)

# stories = gpt2.generate(
#     sess, run_name,
#     truncate="<|endoftext|>", prefix="<|startoftext|>",
#     include_prefix=False, split_context=0.9,
#     nsamples=4, batch_size=2, length=None,
#     temperature=1, top_p=0.9
# )

stories = gpt2.generate_to_file(
    sess, run_name,
    truncate="<|endoftext|>", prefix="<|startoftext|>",
    include_prefix=False, split_context=0.9,
    nsamples=2, batch_size=2, length=5000,
    temperature=1, top_p=0.9
)