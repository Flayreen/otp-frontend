<template>
    <div class="mb-16 block1">
        <div 
        class="flex gap-[16px] justify-between items-center"
        :class="{'in:flex-row  flex-col' : reversed, 'in:flex-row-reverse flex-col': !reversed}"
        >
            <div class="img">
                <img :src="img" alt=""
                    data-aos="fade-up" data-aos-duration="800" data-aos-delay="200"
                    class="lg:max-w-[650px] md:max-w-[613px] md:min-w-[413px] lg:mb-0 mb-14 shadow-lg" 
                    :class="{'rounded-full' : rounded, 'rounded-xl': !rounded}"                    
                    />
            </div>
            <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="200" class="text font-semibold text-[14px] text-[#fff] lg:max-w-[800px] sm:min-w-[343px]"
            :class="{'text-left': left, 'text-center': !left}"
            >
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        img: String,
        rounded: {
            required: false,
            default: false
        },
        reversed: {
            required: false,
            default: false
        },
        left: {
            require: false,
            default: false
        }
    }
}
</script>